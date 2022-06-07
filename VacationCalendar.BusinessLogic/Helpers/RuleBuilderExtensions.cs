namespace VacationCalendar.BusinessLogic.Helpers
{
    using FluentValidation;
    using VacationCalendar.BusinessLogic.Resources;
    using VacationCalendar.BusinessLogic.Services;
    using VacationCalendar.BusinessLogic.Constants;
    using System.Linq.Expressions;

    public static class RuleBuilderExtensions
    {
        public static IRuleBuilderOptions<T, string> MatchesLettersOnlyWithMaximumLength<T>(
            this IRuleBuilderInitial<T, string> rule,
            int maximumLength)
        {
            return rule
                .NotNull().WithMessage(GeneralResource.ErrorMessage_Required)
                .Matches(Constant.Regex.LETTERS_ONLY).WithMessage(GeneralResource.ErrorMessage_InvalidFormatLettersOnly)
                .MaximumLength(maximumLength).WithMessage(GeneralResource.ErrorMessage_MaximumLength);
        }

        public static IRuleBuilderOptions<T, string> NotEmptyMaximumLength<T>(
            this IRuleBuilderInitial<T, string> rule,
            int maximumLength)
        {
            return rule
                .NotEmpty().WithMessage(GeneralResource.ErrorMessage_Required)
                .MaximumLength(maximumLength).WithMessage(GeneralResource.ErrorMessage_MaximumLength);
        }

        public static IRuleBuilderOptions<T, T2> NotNullWithErrorMessage<T, T2>(
            this IRuleBuilderInitial<T, T2> rule)
        {
            return rule.NotNull().WithMessage(GeneralResource.ErrorMessage_Required);
        }

        public static IRuleBuilderOptions<T, TProperty> GreaterThanWithErrorMessage<T, TProperty>(
            this IRuleBuilderInitial<T, TProperty> rule, TProperty value) where TProperty : IComparable<TProperty>, IComparable
        {
            return rule.GreaterThan(value).WithMessage(GeneralResource.ErrorMessage_GreaterThan);
        }

        public static IRuleBuilderOptions<T, TProperty> LessThanOrEqualToWithErrorMessage<T, TProperty>(
            this IRuleBuilder<T, TProperty> rule, TProperty value) where TProperty : IComparable<TProperty>, IComparable
        {
            return rule.LessThanOrEqualTo(value).WithMessage(GeneralResource.ErrorMessage_LessThanOrEqualTo);
        }

        public static IRuleBuilderOptions<T, IEnumerable<TModel>> HasUniqueValues<T, TModel>(
            this IRuleBuilderInitial<T, IEnumerable<TModel>> rule)
        {
            return rule.Must((rootObject, list, context) =>
            {
                var uniqueOrderNumbers = new HashSet<TModel>(list);
                return uniqueOrderNumbers.Count == list.Count();
            });
        }

        public static IRuleBuilderOptions<T, DateTime> LaterThanOrEqualToWithErrorMessage<T>(
            this IRuleBuilder<T, DateTime> ruleBuilder, Expression<Func<T, DateTime>> expression)
        {
            return ruleBuilder.GreaterThanOrEqualTo(expression).WithMessage(GeneralResource.ErrorMessage_LaterThanOrEqualTo);
        }

    }
}
